import React from 'react';
import { Link } from 'react-router-dom';

interface LeagueCardProps {
    id: number;
    name: string;
    country: string;
    logo: string;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ id, name, country, logo }) => {
    return (
        <Link to={`/league/${id}`} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="relative w-full h-48">
                <img src={logo} alt={name} className="absolute inset-0 w-full h-full object-contain" />
            </div>
            <div className="p-4 bg-white">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-gray-600">{country}</p>
            </div>
        </Link>
    );
};

export default LeagueCard;