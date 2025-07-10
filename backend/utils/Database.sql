-- Tabla de categorías
CREATE TABLE Categories (
  id_category SERIAL PRIMARY KEY, -- Auto-incremental
  name VARCHAR(255) NOT NULL
);

-- Imagen asociada a cada categoría
CREATE TABLE Images_category (
  id_image SERIAL PRIMARY KEY,
  id_category INT NOT NULL,
  url_image VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_category) REFERENCES Categories(id_category)
);

-- Usuarios registrados
CREATE TABLE Users (
  id_user SERIAL PRIMARY KEY,
  mail VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL -- Habías escrito "VERCHAR"
);

-- Meditaciones personalizadas creadas por usuarios
CREATE TABLE Personalized_breaths (
  id_breath SERIAL PRIMARY KEY,
  id_user INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  inhale INT NOT NULL,
  hold INT NOT NULL,
  exhale INT NOT NULL,
  cycles INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES Users(id_user)
);
