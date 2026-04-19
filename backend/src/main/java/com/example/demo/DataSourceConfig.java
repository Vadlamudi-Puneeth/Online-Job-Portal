package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Bean
    public DataSource dataSource() {
        String jdbcUrl = databaseUrl;
        
        // If the URL comes from Render/Heroku and starts with postgresql:// or postgres://
        if (jdbcUrl != null && !jdbcUrl.startsWith("jdbc:")) {
            jdbcUrl = jdbcUrl.replace("postgresql://", "jdbc:postgresql://")
                             .replace("postgres://", "jdbc:postgresql://");
        }

        DataSourceBuilder<?> builder = DataSourceBuilder.create()
                .url(jdbcUrl);

        // Render URLs often have the credentials embedded in the URL.
        // If they are explicitly provided in environment variables, we set them here.
        if (username != null && !username.isEmpty()) {
            builder.username(username);
        }
        if (password != null && !password.isEmpty()) {
            builder.password(password);
        }

        return builder.build();
    }
}
