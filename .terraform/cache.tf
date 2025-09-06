resource "aws_cloudfront_cache_policy" "customcads_index" {
  name        = "CustomCADsCachePolicy_Frontend_Index"
  comment     = "Cache policy for the CustomCADs SPA's index.html"
  default_ttl = 60
  max_ttl     = 300
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "whitelist"
      headers {
        items = ["Origin"]
      }
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

resource "aws_cloudfront_cache_policy" "customcads_assets" {
  name        = "CustomCADsCachePolicy_Frontend_Assets"
  comment     = "Cache policy for the CustomCADs SPA's assets"
  default_ttl = 31536000
  max_ttl     = 31536000
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}
