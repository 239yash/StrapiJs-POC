import React, { memo } from 'react';
import Compare from '../../components/Compare';
import pluginId from '../../pluginId';

const HomePage = () => {
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <p>Happy coding by Yash</p>
      <Compare/>
    </div>
  );
};

export default memo(HomePage);
