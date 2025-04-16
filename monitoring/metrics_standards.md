# Metrics Standards

## Naming Conventions

### General Format
All metrics should follow the format:
```
{namespace}_{subsystem}_{metric_name}_{unit}
```

- **namespace**: Application or component name (e.g., `api`, `db`, `frontend`)
- **subsystem**: Functional area within the application (e.g., `http`, `cache`, `auth`)
- **metric_name**: What is being measured (e.g., `requests`, `latency`, `errors`)
- **unit**: Optional unit of measurement (e.g., `seconds`, `bytes`, `ratio`)

### Examples
- `api_http_requests_total`
- `db_query_duration_seconds`
- `frontend_page_load_time_seconds`
- `cache_hit_ratio`

## Standard Metrics

### HTTP Service Metrics
All HTTP services should expose:

1. **Request Count**
   - Name: `{namespace}_http_requests_total`
   - Type: Counter
   - Labels: `method`, `path`, `status_code`
   - Description: Total number of HTTP requests

2. **Request Duration**
   - Name: `{namespace}_http_request_duration_seconds`
   - Type: Histogram
   - Labels: `method`, `path`, `status_code`
   - Buckets: [0.01, 0.05, 0.1, 0.5, 1, 2.5, 5, 10]
   - Description: HTTP request duration in seconds

3. **Request Size**
   - Name: `{namespace}_http_request_size_bytes`
   - Type: Histogram
   - Labels: `method`, `path`
   - Description: HTTP request size in bytes

4. **Response Size**
   - Name: `{namespace}_http_response_size_bytes`
   - Type: Histogram
   - Labels: `method`, `path`, `status_code`
   - Description: HTTP response size in bytes

5. **In-Flight Requests**
   - Name: `{namespace}_http_requests_in_flight`
   - Type: Gauge
   - Labels: `method`, `path`
   - Description: Current number of in-flight HTTP requests

### Database Metrics
All database clients should expose:

1. **Query Count**
   - Name: `{namespace}_db_queries_total`
   - Type: Counter
   - Labels: `operation`, `table`, `status`
   - Description: Total number of database queries

2. **Query Duration**
   - Name: `{namespace}_db_query_duration_seconds`
   - Type: Histogram
   - Labels: `operation`, `table`
   - Buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5]
   - Description: Database query duration in seconds

3. **Connection Pool**
   - Name: `{namespace}_db_connections`
   - Type: Gauge
   - Labels: `state` (idle, used, max)
   - Description: Database connection pool stats

4. **Errors**
   - Name: `{namespace}_db_errors_total`
   - Type: Counter
   - Labels: `operation`, `table`, `error_type`
   - Description: Database operation errors

### Cache Metrics
All caching systems should expose:

1. **Cache Operations**
   - Name: `{namespace}_cache_operations_total`
   - Type: Counter
   - Labels: `operation` (get, set, delete), `status` (hit, miss, error)
   - Description: Total number of cache operations

2. **Cache Duration**
   - Name: `{namespace}_cache_operation_duration_seconds`
   - Type: Histogram
   - Labels: `operation`
   - Buckets: [0.0001, 0.0005, 0.001, 0.005, 0.01, 0.05, 0.1]
   - Description: Cache operation duration in seconds

3. **Cache Size**
   - Name: `{namespace}_cache_size_bytes`
   - Type: Gauge
   - Description: Current size of cache in bytes

4. **Cache Items**
   - Name: `{namespace}_cache_items`
   - Type: Gauge
   - Description: Current number of items in cache

### JVM Metrics (for Java applications)
All Java applications should expose:

1. **Memory Usage**
   - Name: `{namespace}_jvm_memory_bytes`
   - Type: Gauge
   - Labels: `area` (heap, nonheap), `pool`
   - Description: JVM memory usage

2. **Garbage Collection**
   - Name: `{namespace}_jvm_gc_collection_seconds`
   - Type: Summary
   - Labels: `gc`
   - Description: GC collection time

3. **Thread Count**
   - Name: `{namespace}_jvm_threads`
   - Type: Gauge
   - Labels: `state`
   - Description: JVM thread count

### Node.js Metrics
All Node.js applications should expose:

1. **Event Loop Lag**
   - Name: `{namespace}_nodejs_eventloop_lag_seconds`
   - Type: Gauge
   - Description: Node.js event loop lag in seconds

2. **Active Handles**
   - Name: `{namespace}_nodejs_active_handles`
   - Type: Gauge
   - Description: Number of active handles

3. **Active Requests**
   - Name: `{namespace}_nodejs_active_requests`
   - Type: Gauge
   - Description: Number of active requests

4. **Heap Usage**
   - Name: `{namespace}_nodejs_heap_size_bytes`
   - Type: Gauge
   - Labels: `space`
   - Description: Node.js heap usage by space

## Business Metrics

In addition to technical metrics, each application should define business-relevant metrics specific to its domain:

1. **User Activity**
   - Name: `{namespace}_user_actions_total`
   - Type: Counter
   - Labels: `action`, `status`
   - Description: User activity counts

2. **Business Transactions**
   - Name: `{namespace}_business_transactions_total`
   - Type: Counter
   - Labels: `type`, `status`
   - Description: Business transaction counts

3. **Error Rates**
   - Name: `{namespace}_business_errors_total`
   - Type: Counter
   - Labels: `category`, `type`
   - Description: Business error counts

4. **Processing Times**
   - Name: `{namespace}_business_process_duration_seconds`
   - Type: Histogram
   - Labels: `process`
   - Description: Business process duration

## Labels

### Standard Labels
All metrics should include these labels where applicable:

- `instance`: The instance ID of the service (typically hostname:port)
- `job`: The name of the monitored service
- `environment`: The deployment environment (prod, staging, dev)
- `version`: The version of the application

### Custom Labels
Additional labels should be used sparingly to avoid high cardinality:

- Limit to 5-7 labels per metric
- Avoid using high-cardinality values (e.g., user IDs, request IDs)
- Use enumerated values where possible

## Implementation Guidelines

### Instrumentation Libraries
Prefer official Prometheus client libraries:

- Go: github.com/prometheus/client_golang
- Python: prometheus_client
- Java: io.prometheus:simpleclient
- JavaScript: prom-client

### Exposition
- Expose metrics on `/metrics` endpoint
- Use HTTP content type `text/plain; version=0.0.4`
- Secure metrics endpoints in production

### Documentation
- Include help text for all metrics
- Document custom metrics in application documentation
- Provide example queries for common use cases

### Performance Considerations
- Avoid high-cardinality labels
- Use client-side aggregation where possible
- Consider the cost of histogram buckets
- Monitor the performance impact of instrumentation
