import { useState, useEffect } from 'react';

export function useRelativeTime(date: Date): string {
    const [timeString, setTimeString] = useState('');

    useEffect(() => {
        function updateTime() {
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

            if (diffInSeconds < 60) {
                setTimeString('just now');
            } else if (diffInSeconds < 3600) {
                setTimeString(`${Math.floor(diffInSeconds / 60)}m ago`);
            } else if (diffInSeconds < 86400) {
                setTimeString(`${Math.floor(diffInSeconds / 3600)}h ago`);
            } else {
                // Fallback to static date if > 1 day, or handle as needed
                if (diffInSeconds < 172800) { // < 2 days
                    setTimeString('Yesterday');
                } else {
                    setTimeString(date.toLocaleDateString());
                }
            }
        }

        updateTime();
        // Update every minute
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, [date]);

    return timeString;
}
