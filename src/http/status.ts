export function getStatusInfo(status: number) {
  switch (status) {
    case 200:
      return "success";
    case 401:
      return "unauthorized";
    case 403:
      return "forbidden";
    case 404:
      return "not_found";
    case 500:
      return "internal_server_error";
    case 503:
      return "service_unavailable";
    case 504:
      return "gateway_timeout";
    default:
      return "unknown";
  }
}
