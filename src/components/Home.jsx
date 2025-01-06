import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import localforage from 'localforage';
import { defaultGameData } from '../services/mockData';
import { useAuth } from '../contexts/AuthContext';

function Home() {
	const { user } = useAuth();
	const [streak, setStreak] = useState(defaultGameData.currentStreak);
	const [totalLosses, setTotalLosses] = useState(defaultGameData.totalLosses);
	const [userSettings, setUserSettings] = useState({ avatar: '👾' });

	useEffect(() => {
		localforage.getItem('gameData').then((data) => {
			if (data) {
				setStreak(data.currentStreak);
				setTotalLosses(data.totalLosses);
			}
		});
	}, []);

	useEffect(() => {
		localforage.getItem('gameSettings').then((settings) => {
			if (settings) {
				setUserSettings(settings);
			}
		});
	}, []);

	const buttonAnimation = useSpring({
		from: { transform: 'scale(1)' },
		to: async (next) => {
			await next({ transform: 'scale(0.9)' });
			await next({ transform: 'scale(1.1)' });
			await next({ transform: 'scale(1)' });
		},
	});

	const handleLoss = () => {
		const newTotalLosses = totalLosses + 1;
		setTotalLosses(newTotalLosses);
		setStreak(0);

		const newLoss = {
			date: new Date().toISOString(),
			streak: streak
		};

		localforage.getItem('gameData').then((data) => {
			const updatedData = data ? {
				...data,
				currentStreak: 0,
				totalLosses: newTotalLosses,
				lossHistory: [...(data.lossHistory || []), newLoss]
			} : {
				...defaultGameData,
				totalLosses: 1,
				lossHistory: [newLoss]
			};
			localforage.setItem('gameData', updatedData);
		});
	};

	return (
		<div className="h-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex flex-col">
			<div className="pt-6 pb-4 px-4">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-blue-950/50 rounded-xl border-4 border-blue-800 flex items-center justify-center text-2xl shadow-lg float">
							{userSettings.avatar}
						</div>
						<div className="text-left">
							<div className="text-yellow-400 pixel-border text-sm">{user.username}</div>
							<div className="text-blue-200 pixel-border text-xs">PLAYER</div>
						</div>
					</div>
				</div>

				<div className="text-center">
					<h1 className="text-3xl text-yellow-400 pixel-border mb-1">THE GAME</h1>
					<div className="text-sm text-blue-200 pixel-border">Don't think about it!</div>
				</div>
			</div>

			<div className="flex-1 flex flex-col items-center justify-center px-4 relative">
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-10 left-4 text-4xl opacity-20 float">👾</div>
					<div className="absolute bottom-20 right-6 text-4xl opacity-20 float">🎮</div>
					<div className="absolute top-1/2 left-6 text-4xl opacity-20 float">🕹️</div>
				</div>

				<div className="w-full max-w-xs space-y-8 relative">
					<div className="bg-blue-950/50 rounded-xl p-4 border-4 border-blue-800 shadow-lg">
						<h2 className="text-sm text-blue-200 pixel-border mb-2 text-center">DIAS SEM PERDER</h2>
						<div className="text-5xl text-yellow-400 pixel-border float text-center">{streak}</div>
					</div>

					<div className="flex justify-center py-4">
						<animated.button
							style={buttonAnimation}
							onClick={handleLoss}
							className="w-36 h-36 sm:w-40 sm:h-40 bg-red-600 hover:bg-red-500 text-white rounded-2xl pixel-button border-8 border-red-800 active:border-4 flex items-center justify-center text-lg sm:text-xl p-4 text-center leading-tight shadow-[0_0_20px_rgba(220,38,38,0.5)] transform hover:scale-105 transition-transform"
						>
							I LOST
							THE GAME
						</animated.button>
					</div>

					<div className="bg-blue-950/50 rounded-xl p-4 border-4 border-blue-800 shadow-lg">
						<div className="flex items-center justify-between">
							<span className="text-sm text-blue-200 pixel-border">Total Losses</span>
							<span className="text-2xl text-yellow-400 pixel-border">{totalLosses}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="pb-20 pt-4 px-4 text-center">
				<div className="text-xs text-blue-300/60 pixel-border">
					Tap the button when you think about The Game
				</div>
			</div>
		</div>
	);
}

export default Home;