
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Nav() {
	const [userDetails, setUserDetails] = useState(null);

	const router = useNavigate();

	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		if (userDetails !== null) {
			const parsedUserDetails = JSON.parse(userDetails);
			setUserDetails(parsedUserDetails);
		}
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY) {
				// Scrolling down
				setIsVisible(false);
			} else {
				// Scrolling up
				setIsVisible(true);
			}
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return (
		<div
			className={`sticky w-full rounded-2xl flex justify-between items-center px-5 z-20 transform transition-transform duration-300 ease-in-out ${
				isVisible
					? "top-5 translate-y-0 backdrop-blur-sm shadow-sm"
					: "-top-20 -translate-y-full backdrop-blur-0 shadow-none"
			} `}
			style={{
				backgroundColor: "#ffffff20",
				border: "1px solid #c6c8c6",
				backdropFilter: "blur(10px)",
			}}
		>
			<div
				className="flex justify-between items-center cursor-pointer"
				onClick={() => router("/")}
			>
				<img
  src="/assets/images/creatorships-logo.png"
  alt="creatorships-logo"
  width={50}
  height={60}
  className="p-1"
  title="Creatorships Logo"
/>

				<h1 className="text-2xl  relative top-1">CREATORSHIP</h1>
			</div>
			{/* <Search /> */}
			<div className="flex justify-between items-center gap-5">
				<div>
					{userDetails ? (
						<>
							<Button
								style={{ background: "#2F27FF" }}
								variant="contained"
								onClick={() => router("/account")}
							>
								{userDetails?.name[0].toUpperCase() +
									userDetails?.name.slice(1)}
							</Button>
						</>
					) : (
						<>
							<Button
								style={{ background: "#2F27FF" }}
								variant="contained"
								onClick={() => router("/register")}
							>
								Sign up
							</Button>{" "}
							&nbsp;
							<Button
								variant="outlined"
								onClick={() => router("/login")}
							>
								Sign in
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Nav;
