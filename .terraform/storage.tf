resource "aws_s3_bucket" "customcads_frontend_bucket" {
  bucket        = "customcads-frontend"
  force_destroy = true
}

resource "aws_s3_bucket_policy" "customcads_frontend_policy" {
  bucket = aws_s3_bucket.customcads_frontend_bucket.id

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
        Resource = "${aws_s3_bucket.customcads_frontend_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.customcads_frontend.arn
          }
        }
      }
    ]
  })
}

resource "aws_s3_bucket_ownership_controls" "customcads_frontend_ownership" {
  bucket = aws_s3_bucket.customcads_frontend_bucket.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "customcads_frontend_access" {
  bucket                  = aws_s3_bucket.customcads_frontend_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
