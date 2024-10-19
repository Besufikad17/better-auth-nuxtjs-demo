export function getBrowser(str?: string) {
    return str?.split(" ")[8].split("/")[0];
}

export function getDevice(str?: string) {
    return str?.split(' ')[2];
}

export function getToastStyleByType(type: string) {
    switch(type) {
        case "message":
            return "bg-blue-100 text-blue-500";
        case "error":
            return "bg-red-100 text-red-500";
        case "success":
            return "bg-green-100 text-green-500";
        default:
            return "";
    }
}

export function getToastIconByType(type: string) {
    switch(type) {
        case "message":
            return "lucide:info";
        case "error":
            return "material-symbols:error";
        case "success":
            return "teenyicons:tick-outline";
        default:
            return "";
    }
}