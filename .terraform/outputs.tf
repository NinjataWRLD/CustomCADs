output "bucket_name" {
  value       = aws_s3_bucket.customcads_frontend_bucket.bucket
  description = "S3 bucket to upload your Vite build (dist/)"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.customcads_frontend.id
  description = "CloudFront distribution ID (for invalidations)"
}
