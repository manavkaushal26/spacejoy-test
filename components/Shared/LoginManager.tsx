import { Button } from '@components/Button';
import { authUrl } from '@utils/config';

const LoginManager = ({ redirect = '/', ctaText = null, styles = '', onClick = () => {} }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        window.open(`${authUrl}?redirect=${redirect}`, 'popup', 'width=1200,height=830');
        onClick();

        return false;
      }}
    >
      {ctaText}
    </Button>
  );
};

export default LoginManager;
