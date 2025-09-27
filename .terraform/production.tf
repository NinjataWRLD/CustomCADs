resource "aws_s3_bucket" "customcads_production_bucket" {
  bucket        = "customcads-production-frontend"
  force_destroy = true
}

resource "aws_s3_bucket_policy" "customcads_production_bucket_policy" {
  bucket = aws_s3_bucket.customcads_production_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontOACRead"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.customcads_production_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.customcads_production.arn
          }
        }
      }
    ]
  })
}

resource "aws_s3_bucket_ownership_controls" "customcads_production_bucket_ownership" {
  bucket = aws_s3_bucket.customcads_production_bucket.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_cloudfront_origin_access_control" "customcads_production_bucket_oac" {
  name                              = "customcads-production-oac"
  description                       = "OAC for ${aws_s3_bucket.customcads_production_bucket.bucket}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}


resource "aws_s3_bucket_public_access_block" "customcads_production_access" {
  bucket                  = aws_s3_bucket.customcads_production_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_distribution" "customcads_production" {
  origin {
    domain_name              = aws_s3_bucket.customcads_production_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.customcads_production_bucket_oac.id
    origin_id                = local.origin_id

    origin_shield {
      enabled              = true
      origin_shield_region = local.region
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
    acm_certificate_arn            = data.terraform_remote_state.backend.outputs.certificate_arn
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2021"
  }
}

resource "aws_cloudfront_function" "customcads_apex_redirect" {
  name    = "ApexToWWWRedirect"
  runtime = "cloudfront-js-2.0"
  comment = "Redirect customcads.com → www.customcads.com"
  code    = file("apex-redirect.js")
}
