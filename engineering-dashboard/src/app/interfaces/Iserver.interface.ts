export interface Iserver {
  id: number;
  name: string;        // Server Name 
  allocate:string;     // Name of person server is allocated to
  status: string;      // Status of the server
  redirectUrl:string;  // Redirect url
  instanceId:string;   // server instance id
}
