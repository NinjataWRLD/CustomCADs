usage() {
  echo "Usage: $0 [plan|apply|destroy] [production|staging]"
  exit 1
}

OPERATION=$1
ENVIRONMENT=$2

case $OPERATION in
    plan|apply|destroy);;
    *) usage ;;
esac

case $ENVIRONMENT in
  production|staging) ;;
  *) usage ;;
esac

targets=(
  aws_cloudfront_distribution.customcads_"$ENVIRONMENT"
  aws_s3_bucket_policy.customcads_"$ENVIRONMENT"_bucket_policy
  aws_s3_bucket_ownership_controls.customcads_"$ENVIRONMENT"_bucket_ownership
  aws_cloudfront_origin_access_control.customcads_"$ENVIRONMENT"_bucket_oac
  aws_s3_bucket_public_access_block.customcads_"$ENVIRONMENT"_access
)

terraform "$OPERATION" "${targets[@]/#/-target=}"
