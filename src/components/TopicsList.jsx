import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function TopicsList({ setTopic, order, sort_by }) {
	const [topics, setTopics] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`https://caragea-nc-news-backend.herokuapp.com/api/topics`)
			.then((response) => response.json())
			.then(({ topics }) => {
				const allTopics = topics.map((topic) => topic.slug);
				allTopics.unshift("All");
				setTopics(allTopics);
				setLoading(false);
			});
	}, []);
	if (loading) return <p>Loading...</p>;
	return topics.map((topic, index) => {
		return (
			<Dropdown.Item key={index}>
				<NavLink
					onClick={(event) => setTopic(topic)}
					key={topic}
					to={`/articles?sort_by=${sort_by}&order=${order}&topic=${topic}`}
				>
					{topic}
				</NavLink>
			</Dropdown.Item>
		);
	});
}
