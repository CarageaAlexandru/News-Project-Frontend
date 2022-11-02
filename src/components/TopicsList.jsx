import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function TopicsList() {
	const [topics, setTopics] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`https://caragea-nc-news-backend.herokuapp.com/api/topics`)
			.then((response) => response.json())
			.then(({ topics }) => {
				setTopics(topics);
				setLoading(false);
			});
	}, []);
	if (loading) return <p>Loading...</p>;
	const topicsArray = topics.map((topic, index) => {
		return (
			<Dropdown.Item key={index}>
				<NavLink
					key={topic.slug}
					to={`/api/articles/topic/${topic.slug}`}
				>
					{topic.slug}
				</NavLink>
			</Dropdown.Item>
		);
	});
	return topicsArray;
}
