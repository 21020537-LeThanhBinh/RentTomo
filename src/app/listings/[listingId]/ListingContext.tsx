'use client';

import { User } from '@/types';
import React from 'react';

interface ListingContextType {
  userId: string | null;
  listingId: string | null;
  members: User[];
  host: User | null;
}

export const ListingContext = React.createContext<ListingContextType>({
  userId: null,
  listingId: null,
  members: [],
  host: null,
});

export default function ContextProvider({
  userId,
  listingId,
  members,
  host,
  children
}: {
  userId: string | null,
  listingId: string | null,
  members: User[],
  host: User | null,
  children: React.ReactNode
}) {
  return (
    <ListingContext.Provider value={{ userId, listingId, members, host }} >
      {children}
    </ListingContext.Provider>
  );
}