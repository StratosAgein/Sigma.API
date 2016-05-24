echo "`n`t`t`t`t`tWelcome to Sigma DevOps Platform`n`n"
# If exist Azure Accounts registered on Powershell
echo " Deleting existing Azure Accounts..."
Get-AzureAccount | ForEach-Object { Remove-AzureAccount $_.ID -Force -WarningAction SilentlyContinue }
Clear-AzureProfile -Force

# Settings
echo " Creating settings..."
$subscription = Import-AzurePublishSettingsFile "PublishFiles\publish.publishsettings"
$storageAccount = "stratosagein"
$VMFamily = "Ubuntu Server 14.04 LTS"
$VMName = "SABackendNode"
$VMSize = "Small"
$DiskSize= 20
$DiskLabel = "C"
$LogicalUnitNumber = 1
$hcaching = "ReadWrite"
$CloudServiceName = "stratosagein"
$LinuxUser = "thEpisode"
$LinuxPass = "Cami%3_2012"

# Selecting azure subscription
echo "Selecting Azure subscription..."
Select-AzureSubscription -SubscriptionName $subscription[0].Name -Current
# Selecting storageAccount
echo "Setting up Azure subscription..."
Set-AzureSubscription -SubscriptionName $subscription[0].Name -CurrentStorageAccountName $storageAccount

# Selecting Ubuntu Image
echo "Selecting Ubuntu Image..."
$UbuntuImage = Get-AzureVMImage | where { $_.ImageFamily -eq $VMFamily } | sort PublishedDate -Descending | select -ExpandProperty ImageName -First 1

echo "Creating virtual machine configuration..."
$VirtualMachine = New-AzureVMConfig -Name $VMName -InstanceSize $VMSize -ImageName $UbuntuImage ` | Add-AzureProvisioningConfig -Linux -LinuxUser $LinuxUser -Password $LinuxPass | Add-AzureDataDisk -CreateNew -DiskSizeInGB $DiskSize -DiskLabel $DiskLabel -LUN $LogicalUnitNumber -HostCaching $hcaching

echo "Creating Virtual Machine on Microsoft Azure"
New-AzureVM -ServiceName $CloudServiceName -VMs $VirtualMachine