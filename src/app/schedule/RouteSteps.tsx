import React from 'react';
import { MoveRight } from 'lucide-react';

interface SimpleRouteProps {
  locations: string[];
}

const RouteSteps: React.FC<SimpleRouteProps> = ({ locations }) => {
  return (
    <div className="flex flex-wrap items-center justify-between p-4">
      {locations.map((location, index) => (
        <React.Fragment key={index}>
          <span className="px-4 py-2 my-2 bg-blue-100 text-blue-800 font-semibold rounded-full whitespace-nowrap">
            {location}
          </span>
          {index < locations.length - 1 && (
            <span className="text-gray-500 text-xl font-light select-none">
              <MoveRight />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RouteSteps;
