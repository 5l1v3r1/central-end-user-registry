CREATE TABLE public.users
(
  "id" SERIAL NOT NULL,
  "url" character varying(512) NOT NULL,
  "number" character varying(8) NOT NULL,
  CONSTRAINT "PK_USER_ID" PRIMARY KEY (id),
  CONSTRAINT "UK_USERS_NUMBER" UNIQUE (number)
);

CREATE INDEX "IDX_USERS_NUMBER" ON users
  ("number" ASC);
