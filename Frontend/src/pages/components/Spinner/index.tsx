import React from 'react';

import { CircularProgress } from '@material-ui/core';

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps): React.ReactElement =>
  props.loading ? <CircularProgress /> : <></>;

export default Spinner;
