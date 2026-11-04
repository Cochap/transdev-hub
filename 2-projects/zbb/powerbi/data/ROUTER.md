# ROUTER — powerbi/data
Real path: `C:/ZBB/powerbi/data` (pointer router; the project lives outside the brain folder)
Open only the line you need. Every child of this folder is listed below.

## Contents
- `_check.txt` — text file
- `_export.err` — err file
- `_export.log` — log
- `DimClass.csv` — table: Class, SortOrder, MirTypes
- `DimReasonCode.csv` — table: ReasonCode, ReasonDescription, MirExcludeFlag, ZbbExcluded
- `DimRepairCode.csv` — table: RepairCode, RepairDescription, MirExcludeFlag, ZbbExcluded
- `DimVehicle.csv` — table: VehicleID, Unit, Brand, Model, ModelYear, MirType
- `FactBinCurve.csv` — table: BinStartKm, Class, CostPerKm, HoursPerKm, WorkOrders, ShareOfClass
- `FactClassCurve.csv` — table: Class, Km, TypicalCostPerKm, VehicleLow80, VehicleHigh80, WithinData
- `FactCounter.csv` — table: ReadingID, VehicleID, ReadingDate, Odometer, Hours, Litres
- `FactLabour.csv` — table: LabourLineID, WorkOrderID, HoursBilled, HoursReal, LabourCost, Description
- `FactParts.csv` — table: PartLineID, WorkOrderID, PartNumber, Description, Quantity, UnitCost
- `FactVehicleYear.csv` — table: VehicleID, Year, Class, StartKm, EndKm, Km
- `FactWorkOrder.csv` — table: WorkOrderID, VehicleID, Date, Year, Odometer, PartsCost
- `Inflation.csv` — table: Year, Factor2025
