package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        String jdbcUrl = databaseUrl;
        
        DataSourceBuilder<?> builder = DataSourceBuilder.create();

        // If the URL comes from Render/Heroku and starts with postgresql:// or postgres://
        if (jdbcUrl != null && (jdbcUrl.startsWith("postgresql://") || jdbcUrl.startsWith("postgres://"))) {
            URI dbUri = new URI(jdbcUrl);
            
            if (dbUri.getUserInfo() != null) {
                String[] userInfo = dbUri.getUserInfo().split(":");
                builder.username(userInfo[0]);
                if (userInfo.length > 1) {
                    builder.password(userInfo[1]);
                }
            }
            
            // Reconstruct the neat jdbcUrl without user/pass
            String port = dbUri.getPort() != -1 ? ":" + dbUri.getPort() : "";
            jdbcUrl = "jdbc:postgresql://" + dbUri.getHost() + port + dbUri.getPath();
            
            // If there's a query string (like ?sslmode=require), append it!
            if (dbUri.getQuery() != null) {
                jdbcUrl += "?" + dbUri.getQuery();
            }
        }

        builder.url(jdbcUrl);

        // Explicit environment variables override URI ones
        if (username != null && !username.isEmpty()) {
            builder.username(username);
        }
        if (password != null && !password.isEmpty()) {
            builder.password(password);
        }

        return builder.build();
    }
}
