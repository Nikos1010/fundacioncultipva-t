import Link from 'next/link';
import style from './actionButton.module.css';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

interface Props {
  textButton: string;
  path?: string;
  isButton?: Boolean;
  checkButton?: boolean;
}

function ActionButton({ textButton, path, isButton = false, checkButton }: Props) {
  const { t } = useTranslation();
  return (
    <>
      {isButton ? (
        <Button className={style.button} type="submit" disabled={checkButton !== undefined ? !checkButton : false}
                sx={{ color: 'white' }}>
          {t(textButton)}
        </Button>
      ) : (
        <Link href={path || ''} className={style.button}>
          {t(textButton)}
        </Link>
      )}
    </>
  );
}

export default ActionButton;
