# from flask import Flask, jsonify
# from pytrends.request import TrendReq
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# @app.route('/api/trending')
# def trending():
#     pytrends = TrendReq(hl='en-IN', tz=330)
#     try:
#         trending_searches_df = pytrends.trending_searches(pn='india')
#         trending_searches_df = trending_searches_df.head(20)
#         trending_list = trending_searches_df[0].tolist()  # Convert to list
#         return jsonify(trending_list)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)


from pytrends.request import TrendReq
import pandas as pd

# Initialize pytrends with the region set to India
pytrends = TrendReq(hl='en-IN', tz=330)

# Get trending searches in India (returns a DataFrame)
trending_searches = pytrends.trending_searches(pn='india')

# Get the most trending topic by extracting the first entry (index 0)
most_trending_topic = trending_searches.iloc[0, 0]  # Use iloc to access the first topic correctly
print(f"Most Trending Topic in India: {most_trending_topic}")

# Now, use the topic to get related queries
pytrends.build_payload([most_trending_topic], cat=0, timeframe='now 1-d', geo='IN', gprop='')

# Fetch related queries for the most trending topic
related_queries = pytrends.related_queries()

# Extract and display the related queries for the most trending topic
if most_trending_topic in related_queries:
    related_queries_for_topic = related_queries[most_trending_topic]['top']
    print("\nRelated Queries for the Most Trending Topic:")
    print(related_queries)
else:
    print(f"No related queries found for '{most_trending_topic}'")
