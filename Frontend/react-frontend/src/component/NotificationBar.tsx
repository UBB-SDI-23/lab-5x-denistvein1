import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import PubSub from "pubsub-js";
import { SEVERITY_SUCCESS, SHOW_NOTIFICATION } from "../constants";

interface Notification{
    msg: string,
    severity: AlertColor
};

interface NotificationState {
    open: boolean,
    message: string,
    severity: AlertColor,
}

export const NotificationBar = () => {

    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: "",
        severity: SEVERITY_SUCCESS
    });

    const subscriber = function(msg: string, data: Notification){
        setNotification({...notification, open: true, message: data.msg, severity: data.severity});
    }
    
    useEffect(() => {
        const token = PubSub.subscribe(SHOW_NOTIFICATION, subscriber);

        return () => {
            PubSub.unsubscribe(token);
        };
    }, []);
    
    return (
        <Snackbar
            open={notification.open}
            autoHideDuration={3000}
            onClose={(event, reason) => {
                if(reason === "timeout"){
                    setNotification({...notification, open: false})
                }
        }}
        >
            <Alert
                elevation={6}
                variant="filled"
                onClose={() => setNotification({...notification, open: false})}
                severity={notification.severity}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
};