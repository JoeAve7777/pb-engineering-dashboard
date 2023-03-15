import { Iserver } from '../interfaces/Iserver.interface';

export class Server implements Iserver {
  id!: number;
  name!: string;
  allocate!:string;
  status!: string;
  redirectUrl!:string;
  instanceId!:string;
}
