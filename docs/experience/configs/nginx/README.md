## Nginx 配置

### 配置

```
server {
    listen 80;
    server_name _;
    root /app/dist;
    include /etc/nginx/mime.types;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    解决刷新端口丢失问题
    if (-d $request_filename) {
        rewrite [^/]$ $scheme://$http_host$uri/ permanent;
    }
    location / {
        #   指定允许跨域的方法，*代表所有
        add_header Access-Control-Allow-Methods *;
        #   预检命令的缓存，如果不缓存每次会发送两次请求
        add_header Access-Control-Max-Age 3600;
        #   不带cookie请求，并设置为false
        add_header Access-Control-Allow-Credentials false;

        #   表示允许这个域跨域调用（客户端发送请求的域名和端口）
        #   $http_origin动态获取请求客户端请求的域   不用*的原因是带cookie的请求不支持*号
        add_header Access-Control-Allow-Origin $http_origin;

        #   表示请求头的字段 动态获取
        add_header Access-Control-Allow-Headers
        $http_access_control_request_headers;

        #   OPTIONS预检命令，预检命令通过时才发送请求
        #   检查请求的类型是不是预检命令
        if ($request_method = OPTIONS){
            return 200;
        }
        #重定向到index.html
        try_files $uri $uri/ /index.html;

    }
    #location / {
        #重定向到index.html
        #try_files $uri $uri/ /index.html;
    #}
    # bi
    location /biApi/ {
        proxy_pass http://172.18.8.111:28384/;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    # 元数据
    location /api/atlas-server {
        proxy_pass http://172.18.8.111:21000/api/atlas;
    }
    #   离线开发
    location /api/linkis-mg-gateway {
        proxy_pass http://172.18.8.116:9001/api/rest_j;
    }
    location /api/resourcemanager/ {
        proxy_pass http://172.18.8.207:8088/;
    }
    location /api/menu-manage-api/ {
        proxy_pass http://172.18.8.111:21103/;
    }
    location /api {
        proxy_pass http://172.18.8.111:20311;
    }
    #   调度
    location /api/powerjob-server {
        proxy_pass http://172.18.8.111:7701/;
    }
    #   网关
    location /api/mp-gateway-api {
        proxy_pass http://172.18.8.111:20311/api/user-center;
    }

    location /api/menu-manage-api {
        proxy_pass http://172.18.8.111:21103;
    }
    #   用户中心
    location /api/mp-user-center-api {
        proxy_pass http://172.18.8.111:20312/api;
    }

    location /api/route {
        proxy_pass http://172.18.8.111:3000/route;
    }
    #   调度
    location /api/powerjob-server {
        proxy_pass http://172.18.8.111:7701/;
    }
    #   数据源
    location /api/datasource {
        #proxy_pass http://172.18.8.111:20311/datasource/api/jobJdbcDatasource;
        proxy_pass http://172.18.8.111:20311/datasource;
    }

    location /api/layout-service-api {
        proxy_pass http://172.18.8.111:21008/;
    }
    location /api/resourcemanager/ {
        proxy_pass http://172.18.8.111:8088/;
    }
    location /api/prometheus-api {
        proxy_pass http://172.18.8.111:9090/api/v1;
    }

    #   实时开发
    location /api/realtime-dev-admin/ {
        proxy_pass http://172.18.8.111:20502/;
    }

    #   数据服务
    location /api/data-service-admin {
        proxy_pass http://172.18.8.111:21004/;
    }
    #   数据服务 - dqs
    location /api/data-service-dqs {
        proxy_pass http://172.18.8.111:21006/sql/execute;
    }
    #   数据服务 - 日志
    location /api/data-service-log {
        proxy_pass http://172.18.8.111:21005/;
    }

    #   元数据
    location /api/atlas-server {
        proxy_pass http://172.18.8.108:21000/api/atlas;
    }

    #   数据标准
    location /api/data-standard-api {
        proxy_pass http://172.18.8.111:20702/api;
    }

    #   数据质量
    location /api/data-quality-api {
        proxy_pass http://172.18.8.111:20802/quality;
    }
    #   数据资产
    location /api/data-assets-api {
        proxy_pass http://172.18.8.111:20902/data-assets-api;
    }

    #   数据指标
    location /api/dataIndex-api {
        proxy_pass http://172.18.8.111:20305/;
    }
    #   ETL
    location /api/etlServer-api {
        proxy_pass http://172.18.8.111:21202/;
        #proxy_pass http://172.18.42.95:8080/;
    }
    # bi
    location /biApi/ {
        proxy_pass http://172.18.8.111:28384/;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;

    }
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```
