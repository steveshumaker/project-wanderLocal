--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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

SET default_table_access_method = heap;

--
-- Name: experiences; Type: TABLE; Schema: public; Owner: shu
--

CREATE TABLE public.experiences (
    id integer NOT NULL,
    name character varying(50),
    description character varying(250),
    web_path character varying(250),
    photo_path character varying(100),
    user_id integer,
    favorite boolean DEFAULT false,
    rating character varying(5),
    stars character varying(5),
    location_desc character varying(75),
    tags text[],
    yelp_path character varying(250),
    toggle_external boolean DEFAULT true
);


ALTER TABLE public.experiences OWNER TO shu;

--
-- Name: experiences_id_seq; Type: SEQUENCE; Schema: public; Owner: shu
--

CREATE SEQUENCE public.experiences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.experiences_id_seq OWNER TO shu;

--
-- Name: experiences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shu
--

ALTER SEQUENCE public.experiences_id_seq OWNED BY public.experiences.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: shu
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(1000) NOT NULL
);


ALTER TABLE public."user" OWNER TO shu;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: shu
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO shu;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shu
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: experiences id; Type: DEFAULT; Schema: public; Owner: shu
--

ALTER TABLE ONLY public.experiences ALTER COLUMN id SET DEFAULT nextval('public.experiences_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: shu
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: experiences; Type: TABLE DATA; Schema: public; Owner: shu
--

COPY public.experiences (id, name, description, web_path, photo_path, user_id, favorite, rating, stars, location_desc, tags, yelp_path, toggle_external) FROM stdin;
174	An adventure		https://www.yelp.com/biz/sheyla-adventure-travel-llc-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	https://wanderlocal-images.s3.amazonaws.com/images/14/2ebf7a70883a4195e24629081db1c28d	14	f	1	5	Nashville TN	{}	https://s3-media3.fl.yelpcdn.com/bphoto/JS5_VKA8nojT1OXG5IKBWQ/o.jpg	f
73	Boating 	We went on a boat for Cayla's birthday!	https://www.yelp.com/biz/percy-priest-lake-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	3	f	17	4.5	Percy Priest Lake in Nashville	\N	https://s3-media2.fl.yelpcdn.com/bphoto/abQBy2mu0LqAsIQ76HwM3g/o.jpg	t
172	Schrute Farms			https://wanderlocal-images.s3.amazonaws.com/images/12/5e1399447db4f508cf23ca210cd642af	12	f	\N	\N	Scranton, PA	{}	\N	t
170	Scranton	Where it all happened	https://www.yelp.com/biz/voodoo-brewing-scranton?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	https://wanderlocal-images.s3.amazonaws.com/images/12/0bd6ba65d8476b9ab6ca710aac6d93fe	12	f	14	4	Scranton, PA	{}	https://s3-media1.fl.yelpcdn.com/bphoto/Jv8AWlEhbOYSbT2XpbP9zw/o.jpg	f
71	Neighbors Bar	Very solid bar that Lou is working at	https://www.yelp.com/biz/neighbors-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	1	t	100	3.5	Nashville, TN	{Nashville,cheap,"sports bar"}	https://s3-media3.fl.yelpcdn.com/bphoto/5PRahxBMBGv1_d9zeB66ug/o.jpg	t
176	Mother's Ruin		https://www.yelp.com/biz/mother-s-ruin-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	14	f	163	4	Nashville, TN	{bar,fun,friends,germantown}	https://s3-media1.fl.yelpcdn.com/bphoto/UccBtIGjYGKlMmMAd7TBcw/o.jpg	t
178	Chill in Arizona		hang out in Arizona in a retirement community	\N	3	f	224	4.5	Tucson, AZ	{fun,sun,hot}	https://s3-media1.fl.yelpcdn.com/bphoto/W0A7d-Ey58m9Nvc_TxjrHQ/o.jpg	f
188	Percy Warner	I like hiking there!	https://www.yelp.com/biz/percy-warner-park-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	1	f	120	4.5	nashville, tn	{}	https://s3-media2.fl.yelpcdn.com/bphoto/vMo9p2hzVB3NR5JrRD-ycg/o.jpg	t
99	Mothers Ruin		https://www.yelp.com/biz/mother-s-ruin-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	7	f	162	4	Nashville, TN	{fun,bar,drinks,paul,alex}	https://s3-media1.fl.yelpcdn.com/bphoto/UccBtIGjYGKlMmMAd7TBcw/o.jpg	t
100	Neighbor's Bar and Grill	A good sports bar close to Steve	https://www.yelp.com/biz/bartaco-nashville-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	7	f	1733	4.5	Nashville, TN	{sports,bar,fun}	https://s3-media4.fl.yelpcdn.com/bphoto/jT7DiPW17uOYm-Sy4kFBow/o.jpg	t
103	Sounds Game	I go to these with Steve and ask him questions	https://www.yelp.com/biz/nashville-sounds-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	3	f	71	4	Nashville, TN	{sports,hotdogs,beer}	https://s3-media2.fl.yelpcdn.com/bphoto/CplP3qQAOcZXZpXNLMjH8g/o.jpg	t
75	Stonehill College	I graduated from here a few years ago	https://www.yelp.com/biz/stonehill-college-easton-6?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	7	t	7	3	Massachusetts	\N	https://s3-media2.fl.yelpcdn.com/bphoto/-tGncfBbNv3sf1bLuBLPmQ/o.jpg	t
154	Ride in truck		https://www.yelp.com/biz/king-tuts-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	https://wanderlocal-images.s3.amazonaws.com/images/7/1ec23c2f9036e200f0ee9543982b372c	7	f	83	5	Nashville	{}	https://s3-media3.fl.yelpcdn.com/bphoto/__34LTE_3zdjyLgB6OLGug/o.jpg	t
177	Mother's Ruin	The Chicago version of my favorite bar	https://www.yelp.com/biz/mother-s-ruin-chicago?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	1	f	57	4.5	Chicago, IL	{bar,mothers,ruin,chicago,chi}	https://s3-media2.fl.yelpcdn.com/bphoto/lIyMost6yTW01pG13F9eOA/o.jpg	t
173	Duner Miflin			https://wanderlocal-images.s3.amazonaws.com/images/12/9f9e92aed076ee14c4b91fbe5788bfa2	12	f	\N	\N	Scranton, PA	{}	\N	f
175	Camping at a cabin		https://www.yelp.com/biz/otter-creek-recreation-brandenburg?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	https://wanderlocal-images.s3.amazonaws.com/images/14/85bc4d08bc01657e1fb707a14d123298	14	f	1	5	Somewhere, KY	{camping,fun,outdoors}	https://s3-media3.fl.yelpcdn.com/bphoto/JkQbqSkXuHa948XkMJjxGA/o.jpg	t
104	Movies		https://www.yelp.com/biz/regal-opry-mills-nashville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	3	f	122	3.5	Nashville, TN	{barbie,fun,friends}	https://s3-media3.fl.yelpcdn.com/bphoto/aT1xeNxsew8nH3_RRGw5Mg/o.jpg	t
151	Sally's Pizza	A good pizza spot	https://www.yelp.com/biz/sallys-apizza-new-haven?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	\N	1	t	1224	3.5	New Haven, CT	{pizza,ct,best}	https://s3-media4.fl.yelpcdn.com/bphoto/t289D77T4o3QQz2Ty83QYQ/o.jpg	t
179	The Biltmore	A tapestry	https://www.yelp.com/biz/biltmore-estate-asheville?adjust_creative=-TGTFsrzc1-fT05jd77_rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-TGTFsrzc1-fT05jd77_rg	https://wanderlocal-images.s3.amazonaws.com/images/1/2a5e04db48caebebc6678dcb90e9bc0d	1	f	1447	4	Asheville, NC	{}	https://s3-media3.fl.yelpcdn.com/bphoto/dY8C8coTnjBNX-0Bq334mA/o.jpg	t
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: shu
--

COPY public."user" (id, username, password) FROM stdin;
1	steve	$2a$10$7X5LKL0JGtdZCYxo5Y8l6uwEA0vFwz6wxR.PUifCejT/1JHyoRjYi
3	lou	$2a$10$sm9TIYc8tx6QiN3q497vnOkx8QOgZCtFI9glnMLrtP6.M0wNYtwTW
4		$2a$10$KBOR2HFxsqvQ6.GUpQAxkenPgmAKNit1s9874Yz8SOf1WHS2jP3v2
7	matt	$2a$10$0Q4MOz8rZUbLg76zR0h7ieStrMtIvYw0afJYP7mJW27iJmnkqE0JG
11	joan	$2a$10$QNd5SRF2kaED94ZI8ABO9uHFOtnxoe.chYotUVB/HQdPKR.F6TQN6
12	uploaduser	$2a$10$R8LDSH0axSjO3.ziqyPYMe6jGFdIngPsaNiv1UbBfPhRP9HHec5.S
14	drew	$2a$10$zeQQMUwOVP.RPqcO98AToeXKSN1qJ2SJaMI2XftYYDROam08PDVpO
15	chris	$2a$10$FHbGBbdyuRDFDrU2tJVBeeC1dqY7B70uTQKlzovTLQiAP7TNJiALu
\.


--
-- Name: experiences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shu
--

SELECT pg_catalog.setval('public.experiences_id_seq', 188, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shu
--

SELECT pg_catalog.setval('public.user_id_seq', 15, true);


--
-- Name: experiences experiences_pkey; Type: CONSTRAINT; Schema: public; Owner: shu
--

ALTER TABLE ONLY public.experiences
    ADD CONSTRAINT experiences_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: shu
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: shu
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: experiences experiences_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shu
--

ALTER TABLE ONLY public.experiences
    ADD CONSTRAINT experiences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

