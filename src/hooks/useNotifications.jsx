import { useState, useCallback } from 'react';

export const useNotification = () => {
    const [active, setActive] = useState(false)
    const [message, setMessage] = useState('');
    const [resolution, setResolution] = useState('');
    const [notificationType, setErrorNotification] = useState(0);

    const exit = useCallback(() => {
        setActive(false);
    }, []);

    const fireNotification = (notificationType, message = 'system error', resolution = 'contact the administrator') => {
        setMessage(message);
        setResolution(resolution);
        setErrorNotification(notificationType);
        setActive(true);
    }

    return { active, message, resolution, notificationType, fireNotification, exit };
} 