import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockTransactions,mockLineData, transactionSend, mockBarData} from "../data/mockData";

import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import StatBox from "../components/StatBox";
import ProgressCircle from "../components/ProgressCircle";


import InsightsIcon from '@mui/icons-material/Insights';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  let [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Box m="20px" sx={{ overflowX: 'hidden' }}>

      <Box
        sx={{ overflowX: 'hidden' }}
        display="grid"
        gridTemplateColumns={{ xs: '1fr', md: 'repeat(12, 1fr)' }}
        gridAutoRows="auto"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn={{ xs: 'span 12', md: 'span 8' }}
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Grafico de Indicadores
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                R$: 450.00
              </Typography>
            </Box>

          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart data={mockLineData} isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn={{ xs: 'span 12', md: 'span 4' }}
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Transações Recebidas
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.type}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={{ xs: 'span 12', md: 'span 4' }}
          backgroundColor={colors.primary[400]}
          p={{ xs: '20px', md: '30px' }}
        >
          <Typography variant="h5" fontWeight="600">
            Lucro x Investimento
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress={0.50} size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              R$: 150.00 de Lucro
            </Typography>
            <Typography>Incluindo ou não impostos?</Typography>
          </Box>
        </Box>

        <Box
          gridColumn={{ xs: 'span 12', md: 'span 4' }}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          backgroundColor={colors.primary[400]}
          padding="20px"
        >
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="300,00"
              subtitle="Valor Investido"
              progress="0.50"
              increase="+33%"
              icon={
                <InsightsIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="150,00"
              subtitle="Lucro Obtido"
              progress="0.50"
              increase="+66%"
              icon={
                <AttachMoneyOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
        <Box
          gridColumn={{ xs: 'span 12', md: 'span 4' }}
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Transações Enviadas
            </Typography>
          </Box>
          {transactionSend.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.redAccent[100]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.type}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>Priority: <strong>{transaction.thepriority}</strong></Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.redAccent[700]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;