import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";

type Props = {
  date: Date;
};

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: "p",
  other: "MM/dd/yy",
};

const useFormatDate = ({ date }: Props) => {
  // Format date
  const formatedDate = formatRelative(date, new Date(), {
    locale: {
      ...enUS,
      formatRelative: (token) =>
        formatRelativeLocale[token as keyof typeof formatRelativeLocale],
    },
  });

  return formatedDate;
};

export default useFormatDate;
