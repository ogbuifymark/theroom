output "function_name" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.lambda.function_name
}

output "api_invoke_url" {
  description = "Api Gateway invoke url"
  value       = aws_apigatewayv2_stage.lambda.invoke_url
}