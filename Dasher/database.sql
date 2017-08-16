--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cd.users; Type: TABLE; Schema: public; Owner: hamzahaseeb
--

CREATE TABLE "cd.users" (
    id integer NOT NULL,
    "Name" text NOT NULL
);


ALTER TABLE "cd.users" OWNER TO hamzahaseeb;

--
-- Name: cd.users_id_seq; Type: SEQUENCE; Schema: public; Owner: hamzahaseeb
--

CREATE SEQUENCE "cd.users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "cd.users_id_seq" OWNER TO hamzahaseeb;

--
-- Name: cd.users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hamzahaseeb
--

ALTER SEQUENCE "cd.users_id_seq" OWNED BY "cd.users".id;


--
-- Name: cd.users id; Type: DEFAULT; Schema: public; Owner: hamzahaseeb
--

ALTER TABLE ONLY "cd.users" ALTER COLUMN id SET DEFAULT nextval('"cd.users_id_seq"'::regclass);


--
-- Data for Name: cd.users; Type: TABLE DATA; Schema: public; Owner: hamzahaseeb
--

COPY "cd.users" (id, "Name") FROM stdin;
1	Test
\.


--
-- Name: cd.users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hamzahaseeb
--

SELECT pg_catalog.setval('"cd.users_id_seq"', 1, false);


--
-- Name: cd.users cd.users_pkey; Type: CONSTRAINT; Schema: public; Owner: hamzahaseeb
--

ALTER TABLE ONLY "cd.users"
    ADD CONSTRAINT "cd.users_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

