import { requestInstance } from '@/service';

interface IFooItem {
  id: string;
  name: string;
}
/** get 请求 */
export const postFooAPI = (name: string) => {
  return requestInstance.request<IFooItem>({
    url: `/foo`,
    method: 'POST',
    data: { name }
  });
};
