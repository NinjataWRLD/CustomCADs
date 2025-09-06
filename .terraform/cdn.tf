locals {
  origin_id = "s3-customcads_app"
}

resource "aws_cloudfront_distribution" "customcads_frontend" {
  origin {
    domain_name              = aws_s3_bucket.customcads_frontend_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.customcads_oac.id
    origin_id                = local.origin_id

    origin_shield {
      enabled              = true
      origin_shield_region = var.region
    }
  }

  enabled         = true
  is_ipv6_enabled = true
  aliases         = ["customcads.com", "www.customcads.com"]

  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    target_origin_id           = local.origin_id
    cache_policy_id            = aws_cloudfront_cache_policy.customcads_index.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.customcads_security.id
    viewer_protocol_policy     = "redirect-to-https"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.customcads_apex_redirect.arn
    }
  }

  ordered_cache_behavior {
    path_pattern               = "/assets/*"
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    target_origin_id           = local.origin_id
    cache_policy_id            = aws_cloudfront_cache_policy.customcads_assets.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.customcads_security.id
    viewer_protocol_policy     = "redirect-to-https"
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }
  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  price_class = "PriceClass_100"
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = aws_acm_certificate.customcads_certificate.arn
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2021"
  }
}
