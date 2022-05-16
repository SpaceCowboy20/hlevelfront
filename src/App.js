import { Card } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import React, { Component } from "react";
const { Meta } = Card;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 0,
			loading: true,
		};
	}
	printDiv = () => {
		var divContents = document.getElementById("App").innerHTML;
		var a = window.open("", "", "height=500, width=500");
		a.document.write(divContents);
		a.document.close();
		a.print();
	};

	updateCount = async () => {
		let text = async (url) => {
			return fetch(url).then((res) => res.text());
		};

		let z = await text("https://www.cloudflare.com/cdn-cgi/trace").then(
			(data) => {
				let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
				let ip = data.match(ipRegex)[0];
				return ip;
			}
		);
		console.log(z);

		fetch("http://localhost:780/test", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				_method: "PATCH",
				Authorization: "",
				adress: z,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log("test", res);
				this.setState({ count: res.count, loading: false });
				return res;
			})
			.catch((err) => console.error(err));
	};
	componentWillMount = this.updateCount;

	render() {
		// window.onload = this.updateCount;

		console.log(this.state.count);

		return (
			<div className="App" id="App">
				<Card
					id="Card"
					hoverable
					style={{ width: 400, height: 600 }}
					cover={
						<img alt="myPhoto" src="https://i.ibb.co/5K5cYnG/IMG-2650-1.jpg" />
					}
					onClick={this.printDiv}
					loading={this.state.loading}
				>
					<Meta
						style={{
							backgroundColor: "white",
							transform: `translateY(-1.3rem)`,
						}}
						title={`votre numero est: ${this.state.count}`}
					/>
				</Card>
			</div>
		);
	}
}

export default App;
