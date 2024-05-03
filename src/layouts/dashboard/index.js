import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Importa la imagen que deseas utilizar
import bigImage from "../../assets/images/main.jpg";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        {/* Aquí está la imagen grande */}
        <img src={bigImage} alt="Big Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
