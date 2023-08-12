'use client'

import { FacebookProvider, CustomChat } from 'react-facebook';

export default function FacebookMsg() {
  return (
    <FacebookProvider appId="236533739098515" chatSupport>
      <CustomChat pageId="106398312538865" minimized={true} />
    </FacebookProvider>
  );
}