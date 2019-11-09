--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: channel_member; Type: TABLE; Schema: public; Owner: barcld01
--

CREATE TABLE public.channel_member (
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    channel_id integer NOT NULL
);


ALTER TABLE public.channel_member OWNER TO barcld01;

--
-- Name: channels; Type: TABLE; Schema: public; Owner: barcld01
--

CREATE TABLE public.channels (
    id integer NOT NULL,
    name character varying(255),
    public boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    team_id integer
);


ALTER TABLE public.channels OWNER TO barcld01;

--
-- Name: channels_id_seq; Type: SEQUENCE; Schema: public; Owner: barcld01
--

CREATE SEQUENCE public.channels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channels_id_seq OWNER TO barcld01;

--
-- Name: channels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: barcld01
--

ALTER SEQUENCE public.channels_id_seq OWNED BY public.channels.id;


--
-- Name: direct_messages; Type: TABLE; Schema: public; Owner: barcld01
--

CREATE TABLE public.direct_messages (
    id integer NOT NULL,
    text character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    team_id integer,
    receiver_id integer,
    sender_id integer
);


ALTER TABLE public.direct_messages OWNER TO barcld01;

--
-- Name: direct_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: barcld01
--

CREATE SEQUENCE public.direct_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.direct_messages_id_seq OWNER TO barcld01;

--
-- Name: direct_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: barcld01
--

ALTER SEQUENCE public.direct_messages_id_seq OWNED BY public.direct_messages.id;


--
-- Name: members; Type: TABLE; Schema: public; Owner: barcld01
--

CREATE TABLE public.members (
    admin boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    team_id integer NOT NULL
);


ALTER TABLE public.members OWNER TO barcld01;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: barcld01
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    text character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    channel_id integer,
    user_id integer
);


ALTER TABLE public.messages OWNER TO barcld01;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: barcld01
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO barcld01;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: barcld01
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: barcld01
--

CREATE TABLE public.teams (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.teams OWNER TO barcld01;

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: barcld01
--

CREATE SEQUENCE public.teams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_id_seq OWNER TO barcld01;

--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: barcld01
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: barcld01
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO barcld01;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: barcld01
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO barcld01;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: barcld01
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: channels id; Type: DEFAULT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.channels ALTER COLUMN id SET DEFAULT nextval('public.channels_id_seq'::regclass);


--
-- Name: direct_messages id; Type: DEFAULT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.direct_messages ALTER COLUMN id SET DEFAULT nextval('public.direct_messages_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: channel_member; Type: TABLE DATA; Schema: public; Owner: barcld01
--

COPY public.channel_member (created_at, updated_at, user_id, channel_id) FROM stdin;
\.


--
-- Data for Name: channels; Type: TABLE DATA; Schema: public; Owner: barcld01
--

COPY public.channels (id, name, public, created_at, updated_at, team_id) FROM stdin;
1	general	t	2019-11-09 12:32:36.827+00	2019-11-09 12:32:36.827+00	1
2	general	t	2019-11-09 17:47:39.3+00	2019-11-09 17:47:39.3+00	2
\.


--
-- Data for Name: direct_messages; Type: TABLE DATA; Schema: public; Owner: barcld01
--

COPY public.direct_messages (id, text, created_at, updated_at, team_id, receiver_id, sender_id) FROM stdin;
1	Hi test	2019-11-09 12:35:28.146+00	2019-11-09 12:35:28.146+00	1	1	2
2	Hello friend	2019-11-09 12:36:00.248+00	2019-11-09 12:36:00.248+00	1	2	1
3	Sup mate	2019-11-09 12:36:16.123+00	2019-11-09 12:36:16.123+00	1	1	2
4	hi	2019-11-09 13:34:34.67+00	2019-11-09 13:34:34.67+00	1	2	1
5	yo	2019-11-09 13:34:41.05+00	2019-11-09 13:34:41.05+00	1	1	2
6	hi friend	2019-11-09 13:38:29.349+00	2019-11-09 13:38:29.349+00	1	2	1
7	yo friend	2019-11-09 13:38:36.892+00	2019-11-09 13:38:36.892+00	1	1	2
8	hi amigo	2019-11-09 13:45:00.052+00	2019-11-09 13:45:00.052+00	1	1	2
9	yo	2019-11-09 13:51:07.18+00	2019-11-09 13:51:07.18+00	1	2	2
10	hi	2019-11-09 13:51:16.495+00	2019-11-09 13:51:16.495+00	1	2	1
11	actively maintained	2019-11-09 13:54:35.488+00	2019-11-09 13:54:35.488+00	1	2	1
12	hi friend	2019-11-09 13:55:57.172+00	2019-11-09 13:55:57.172+00	1	1	2
13	hi	2019-11-09 13:57:15.948+00	2019-11-09 13:57:15.948+00	1	2	1
14	yo	2019-11-09 13:57:43.593+00	2019-11-09 13:57:43.593+00	1	1	2
15	hello	2019-11-09 13:57:56.314+00	2019-11-09 13:57:56.314+00	1	1	2
16	hi	2019-11-09 13:59:03.129+00	2019-11-09 13:59:03.129+00	1	2	1
17	yo	2019-11-09 14:10:28.314+00	2019-11-09 14:10:28.314+00	1	1	2
18	hi	2019-11-09 14:13:18.361+00	2019-11-09 14:13:18.361+00	1	2	1
19	yo	2019-11-09 14:14:48.909+00	2019-11-09 14:14:48.909+00	1	2	1
20	sup bro	2019-11-09 14:15:20.015+00	2019-11-09 14:15:20.015+00	1	1	2
21	hi	2019-11-09 14:15:56.315+00	2019-11-09 14:15:56.315+00	1	1	2
22	yes	2019-11-09 14:17:39.929+00	2019-11-09 14:17:39.929+00	1	2	1
23	yes	2019-11-09 14:18:52.429+00	2019-11-09 14:18:52.429+00	1	2	1
24	yo	2019-11-09 14:19:04.296+00	2019-11-09 14:19:04.296+00	1	1	2
25	HI	2019-11-09 14:21:09.204+00	2019-11-09 14:21:09.204+00	1	2	1
26	sad	2019-11-09 14:21:27.897+00	2019-11-09 14:21:27.897+00	1	1	2
27	k	2019-11-09 14:22:58.129+00	2019-11-09 14:22:58.129+00	1	2	1
28	sup	2019-11-09 14:24:00.289+00	2019-11-09 14:24:00.289+00	1	3	1
29	yes my g	2019-11-09 14:25:35.097+00	2019-11-09 14:25:35.097+00	1	1	3
30	hi ben	2019-11-09 14:25:41.967+00	2019-11-09 14:25:41.967+00	1	3	3
31	Hello my friend	2019-11-09 14:28:08.593+00	2019-11-09 14:28:08.593+00	1	2	1
32	hi	2019-11-09 14:28:35.143+00	2019-11-09 14:28:35.143+00	1	1	2
33	sad	2019-11-09 14:31:01.821+00	2019-11-09 14:31:01.821+00	1	1	2
34	hi	2019-11-09 14:31:28.638+00	2019-11-09 14:31:28.638+00	1	3	2
35	mi	2019-11-09 14:31:35.986+00	2019-11-09 14:31:35.986+00	1	3	2
36	hi	2019-11-09 14:32:13.185+00	2019-11-09 14:32:13.185+00	1	2	2
37	mu	2019-11-09 14:33:10.496+00	2019-11-09 14:33:10.496+00	1	2	2
38	hi bro	2019-11-09 15:22:41.287+00	2019-11-09 15:22:41.287+00	1	3	1
39	yo man	2019-11-09 15:22:57.294+00	2019-11-09 15:22:57.294+00	1	1	3
40	bang!	2019-11-09 15:24:06.514+00	2019-11-09 15:24:06.514+00	1	3	1
41	bang	2019-11-09 15:25:57.421+00	2019-11-09 15:25:57.421+00	1	3	1
42	Kanye	2019-11-09 15:27:31.586+00	2019-11-09 15:27:31.586+00	1	3	1
43	get right	2019-11-09 15:27:40.454+00	2019-11-09 15:27:40.454+00	1	1	3
44	for the summer	2019-11-09 15:28:13.367+00	2019-11-09 15:28:13.367+00	1	1	3
45	work out	2019-11-09 15:28:17.633+00	2019-11-09 15:28:17.633+00	1	3	1
46	tape	2019-11-09 15:28:27.361+00	2019-11-09 15:28:27.361+00	1	3	1
47	get right	2019-11-09 15:29:01.703+00	2019-11-09 15:29:01.703+00	1	1	2
48	nba player?	2019-11-09 15:29:08.886+00	2019-11-09 15:29:08.886+00	1	2	1
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: barcld01
--

COPY public.members (admin, created_at, updated_at, user_id, team_id) FROM stdin;
t	2019-11-09 12:32:36.833+00	2019-11-09 12:32:36.833+00	1	1
f	2019-11-09 12:34:18.256+00	2019-11-09 12:34:18.256+00	2	1
f	2019-11-09 14:23:50.044+00	2019-11-09 14:23:50.044+00	3	1
t	2019-11-09 17:47:39.305+00	2019-11-09 17:47:39.305+00	1	2
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: barcld01
--

COPY public.messages (id, text, created_at, updated_at, channel_id, user_id) FROM stdin;
1	Hi guys!	2019-11-09 12:34:44.301+00	2019-11-09 12:34:44.301+00	1	1
2	Sup bro?	2019-11-09 12:34:49.745+00	2019-11-09 12:34:49.745+00	1	2
3	talk on here	2019-11-09 14:00:00.722+00	2019-11-09 14:00:00.722+00	1	1
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: barcld01
--

COPY public.teams (id, name, created_at, updated_at) FROM stdin;
1	Barclays	2019-11-09 12:32:36.817+00	2019-11-09 12:32:36.817+00
2	test	2019-11-09 17:47:39.281+00	2019-11-09 17:47:39.281+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: barcld01
--

COPY public.users (id, username, email, password, created_at, updated_at) FROM stdin;
1	test	t@t.com	$2b$12$0ZkvI.0QDM8Gtjnva1x0eebDWgtBQy2GpYgwf4FaKKeqE8tRLCFxa	2019-11-09 12:29:15.468+00	2019-11-09 12:29:15.468+00
2	test2	t1@t.com	$2b$12$/jinKdCBBZt1NNW2AFTgWOZPsZ8zyRpCspZ7i7I8grzdX6Tw8F6ge	2019-11-09 12:33:21.095+00	2019-11-09 12:33:21.095+00
3	tester2	t2@t.com	$2b$12$3ugM6TgGw0zIYNDvgAzTqO/emSBgfuEtMjv4WHwK4xd6iw5y/qZKW	2019-11-09 14:23:35.484+00	2019-11-09 14:23:35.484+00
\.


--
-- Name: channels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: barcld01
--

SELECT pg_catalog.setval('public.channels_id_seq', 2, true);


--
-- Name: direct_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: barcld01
--

SELECT pg_catalog.setval('public.direct_messages_id_seq', 48, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: barcld01
--

SELECT pg_catalog.setval('public.messages_id_seq', 3, true);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: barcld01
--

SELECT pg_catalog.setval('public.teams_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: barcld01
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: channel_member channel_member_pkey; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.channel_member
    ADD CONSTRAINT channel_member_pkey PRIMARY KEY (user_id, channel_id);


--
-- Name: channels channels_pkey; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);


--
-- Name: direct_messages direct_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT direct_messages_pkey PRIMARY KEY (id);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (user_id, team_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: teams teams_name_key; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_name_key UNIQUE (name);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: channel_member channel_member_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.channel_member
    ADD CONSTRAINT channel_member_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: channel_member channel_member_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.channel_member
    ADD CONSTRAINT channel_member_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: channels channels_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: direct_messages direct_messages_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT direct_messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: direct_messages direct_messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT direct_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: direct_messages direct_messages_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT direct_messages_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: members members_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: members members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messages messages_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: messages messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: barcld01
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

