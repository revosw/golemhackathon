// components/Post.js
import React from "react";
import Image from "next/image";

interface PostProps {
	user: {
		username: string;
		imageurl: string;
	};
	content: string;
	posted: string;
	likes: number;
}

function Post({ user, posted, likes, content }: PostProps) {
	return (
		<div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mb-4">
			<div className="flex items-start">
				{/* User Image */}
				<div className="flex-shrink-0">
					<Image
						className="rounded-full"
						src={user.imageurl}
						alt={`${user.username}'s profile picture`}
						width={50}
						height={50}
					/>
				</div>
				<div className="ml-4">
					{/* User Info */}
					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-semibold text-gray-900">{user.username}</h4>
							<p className="text-sm text-gray-500">{posted}</p>
						</div>
					</div>
					{/* Post Content */}
					<p className="mt-2 text-gray-800">{content}</p>
					{/* Likes */}
					<div className="mt-3 flex items-center text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-5 h-5 mr-1"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14 9l-6 6m0 0l-6-6m6 6V2m0 13l6 6"
							/>
						</svg>
						<span>{likes} likes</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Post;
