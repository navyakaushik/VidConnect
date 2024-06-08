import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        console.log(`Querying call with ID: ${id}`);
        
        // Querying the call with the given ID
        const { calls } = await client.queryCalls({ filter_conditions: { id } });

        if (calls.length > 0) {
          setCall(calls[0]);
          console.log('Call found:', calls[0]);
        } else {
          console.log('No call found with the given ID');
        }

        setIsCallLoading(false);
      } catch (error) {
        console.error('Error fetching call:', error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
