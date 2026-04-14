FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app
COPY . .

# entra na pasta do backend
WORKDIR /app/estoque-api
RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# copia o jar gerado
COPY --from=build /app/estoque-api/target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
