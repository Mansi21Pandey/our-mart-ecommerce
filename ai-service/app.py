
from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "Our Mart AI Recommendation Service is running!"
    })


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json(silent=True) or {}
    products = data.get("products", [])
    product_id = data.get("product_id")

    if not isinstance(products, list) or not products:
        return jsonify({
            "success": False,
            "message": "Please provide a non-empty products list."
        }), 400

    for product in products:
        if not isinstance(product, dict):
            return jsonify({
                "success": False,
                "message": "Invalid product data."
            }), 400

    # Find the selected product
    selected = next(
        (p for p in products if str(p.get("id")) == str(product_id)),
        None
    )

    if selected is None:
        return jsonify({
            "success": False,
            "message": "Selected product not found."
        }), 404

    # Get the selected product's category
    selected_category = str(
        selected.get("category") or ""
    ).strip().casefold()

    # Keep only products from the same category,
    # excluding the selected product itself
    same_category_products = [
        p for p in products
        if str(p.get("id")) != str(product_id)
        and str(p.get("category") or "").strip().casefold()
        == selected_category
    ]

    # No similar-category products available
    if not same_category_products:
        return jsonify({
            "success": True,
            "recommendations": []
        })

    def product_text(product):
        return " ".join(
            str(product.get(field) or "")
            for field in ("name", "category", "description")
        ).strip()

    # Compare the selected product with same-category products only
    candidates = [selected] + same_category_products
    texts = [product_text(p) for p in candidates]

    try:
        matrix = TfidfVectorizer(
            stop_words="english"
        ).fit_transform(texts)

        similarities = cosine_similarity(matrix)

        # Index 0 is the selected product
        ranked = sorted(
            [
                (i, float(similarities[0][i]))
                for i in range(1, len(candidates))
            ],
            key=lambda item: item[1],
            reverse=True
        )

        recommendations = []

        for index, score in ranked[:5]:
            item = dict(candidates[index])
            item["similarity"] = round(score, 3)
            recommendations.append(item)

    except ValueError:
        # Handles products whose text is empty or contains
        # no usable terms for TF-IDF
        recommendations = [
            dict(product)
            for product in same_category_products[:5]
        ]

    return jsonify({
        "success": True,
        "recommendations": recommendations
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5001,
        debug=True
    )