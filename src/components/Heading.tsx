'use client';

import FollowButton from "./HeartButton";
import ShareButton from "./ShareButton";

interface HeadingProps {
  userId?: string | null;
  id: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  userId,
  id,
  title,
  subtitle,
  center
}) => {
  return (
    <div className={`w-full ${center ? 'text-center' : 'text-start'}`}>
      <div className="text-2xl font-bold">
        {title}
      </div>

      <div className="mt-2 flex gap-2 justify-between items-center">
        <div className="font-light text-neutral-500">
          {subtitle}
        </div>

        <div className="flex gap-4 items-end">
          <ShareButton
            listingId={id}
            title={title}
            userId={userId}
          />

          <FollowButton
            listingId={id}
            userId={userId}
            full
          />
        </div>
      </div>
    </div>
  );
}

export default Heading;