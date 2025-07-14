import styles from "../contacto/contacto.module.scss";

interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => (
  <>
    <h1 className={styles["page-title"]}>{children}</h1>
    <div className={styles["title-underline"]}></div>
  </>
);

export default PageTitle;
