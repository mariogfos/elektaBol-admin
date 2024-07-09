import ViewSurveys from "@/modulos/Surveys/ViewSurveys";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import { useAuth } from "@/mk/contexts/AuthProvider";
import useScreenSize from "@/mk/hooks/useScreenSize";

const RenderView = (props: {
  open: boolean;
  onClose: any;
  item: Record<string, any>;
  onConfirm?: Function;
}) => {
  const { user } = useAuth();
  const { isTablet } = useScreenSize();
  return (
    <DataModal
      open={props.open}
      onClose={props?.onClose}
      title={"Detalle de Encuesta"}
      buttonText=""
      buttonCancel=""
      fullScreen={isTablet}
    >
      <ViewSurveys data={props?.item} user={user} />
    </DataModal>
  );
};

export default RenderView;
