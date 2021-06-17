CREATE DATABASE IF NOT EXISTS gandalua;
USE gandalua;

CREATE TABLE kit (
  id_kit int NOT NULL AUTO_INCREMENT,
  nome_kit varchar(50) NOT NULL,
  valor_kit float NOT NULL,
  disp int NOT NULL,
  PRIMARY KEY (id_kit),
  UNIQUE KEY nome_kit_UN (nome_kit)
);
