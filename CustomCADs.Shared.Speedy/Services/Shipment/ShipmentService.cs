﻿using CustomCADs.Shared.Speedy.API.Dtos.ShipmentContent;
using CustomCADs.Shared.Speedy.API.Dtos.ShipmentSenderAndRecipient.ShipmentRecipient;
using CustomCADs.Shared.Speedy.API.Dtos.ShipmentService;
using CustomCADs.Shared.Speedy.API.Endpoints.ShipmentEndpoints;
using CustomCADs.Shared.Speedy.Services.Calculation;
using CustomCADs.Shared.Speedy.Services.Client;
using CustomCADs.Shared.Speedy.Services.Location.Office;
using CustomCADs.Shared.Speedy.Services.Models;
using CustomCADs.Shared.Speedy.Services.Models.Calculation.Recipient;
using CustomCADs.Shared.Speedy.Services.Models.Calculation.Sender;
using CustomCADs.Shared.Speedy.Services.Models.Shipment;
using CustomCADs.Shared.Speedy.Services.Models.Shipment.Content;
using CustomCADs.Shared.Speedy.Services.Models.Shipment.Parcel;
using CustomCADs.Shared.Speedy.Services.Models.Shipment.Payment;
using CustomCADs.Shared.Speedy.Services.Models.Shipment.Primary;
using CustomCADs.Shared.Speedy.Services.Models.Shipment.Recipient;
using CustomCADs.Shared.Speedy.Services.Models.Shipment.Secondary;
using CustomCADs.Shared.Speedy.Services.Models.Shipment.Sender;
using CustomCADs.Shared.Speedy.Services.Models.Shipment.Service;
using CustomCADs.Shared.Speedy.Services.Models.Shipment.Service.AdditionalServices.Cod;
using CustomCADs.Shared.Speedy.Services.Services;
using CustomCADs.Shared.Speedy.Services.Shipment.Models;

namespace CustomCADs.Shared.Speedy.Services.Shipment;

using static Constants;

public class ShipmentService(
    IShipmentEndpoints endpoints,
    OfficeService officeService,
    ClientService clientService,
    ServicesService servicesService
)
{
    public async Task<WrittenShipmentModel> CreateShipmentAsync(
        AccountModel account,
        string package,
        string contents,
        int parcelCount,
        int totalWeight,
        string? shipmentNote = null,
        CancellationToken ct = default)
    {
        var dropoffOffices = await officeService.FindAsync(account, 100, null, null, null, null, ct).ConfigureAwait(false);
        int dropoffOfficeId = dropoffOffices.First().Id;

        var pickupOffices = await officeService.FindAsync(account, 100, null, null, null, null, ct).ConfigureAwait(false);
        int pickupOfficeId = pickupOffices.Last().Id;

        long clientId = await clientService.GetOwnClientIdAsync(account, ct).ConfigureAwait(false);

        CalculationAddressLocationModel calcAddress = new(
            CountryId: null,
            StateId: null,
            SiteName: null,
            SiteType: null,
            SiteId: null,
            PostCode: null
        );
        CalculationRecipientModel calcRecipient = new(calcAddress, clientId, null, pickupOfficeId, null);
        CalculationSenderModel calcSender = new(calcAddress, clientId, null, dropoffOfficeId, null);
        var services = await servicesService.DestinationServices(account, calcRecipient, null, calcSender, ct).ConfigureAwait(false);

        var response = await endpoints.CreateShipmentAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            ShipmentNote: shipmentNote,

            Sender: new(
                ClientId: clientId,
                DropoffOfficeId: dropoffOfficeId,
                Phone1: new("0885440400", null),
                DropoffGeoPUDOId: null,
                ClientName: null,
                Address: null,
                PrivatePerson: null,
                ContactName: null,
                Email: null,
                Phone2: null,
                Phone3: null
            ),
            Recipient: new ShipmentRecipientDto(
                PickupOfficeId: pickupOfficeId,
                ClientId: clientId,
                Address: null,
                ClientName: null,
                Phone1: null,
                PrivatePerson: null,
                ContactName: null,
                Email: null,
                ObjectName: null,
                PickupGeoPUDOIf: null,
                AutoSelectNearestOffice: null,
                AutoSelectNearestOfficePolicy: null,
                Phone2: null,
                Phone3: null
            ),
            Service: new ShipmentServiceDto(
                ServiceId: services.First().CourierService.Id,
                PickupDate: null,
                AdditionalServices: null,
                SaturdayDelivery: null
            ),
            Content: new ShipmentContentDto(
                Package: package,
                Contents: contents,
                ParcelsCount: parcelCount,
                TotalWeight: totalWeight,
                Parcels: null,
                Palletized: null,
                PendingParcels: null,
                Documents: null,
                ExciseGoods: null,
                Iq: null,
                GoodsValue: null,
                GoodsValueCurrencyCode: null,
                UitCode: null
            ),
            Payment: new(
                CourierServicePayer: Payer.RECIPIENT,
                DeclaredValuePayer: null,
                PackagePayer: null,
                ThirdPartyClientId: null,
                DiscountCardId: null,
                SenderBankAccount: null,
                AdministrativeFee: null
            ),

            Id: null,
            Ref1: null,
            Ref2: null,
            ConsolidationRef: null,
            RequireUnsuccessfulDeliveryStickerImage: null
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
        return new(
            Id: response.Id,
            Parcels: [.. response.Parcels.Select(p => p.ToModel())],
            Price: response.Price.ToModel(),
            PickupDate: DateOnly.Parse(response.PickupDate),
            DeliveryDeadline: DateTime.Parse(response.DeliveryDeadline)
        );
    }

    public async Task CancelShipmentAsync(
        AccountModel account,
        string shipmentId,
        string comment,
        CancellationToken ct = default)
    {
        var response = await endpoints.CancelShipmentAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            ShipmentId: shipmentId,
            Comment: comment
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
    }

    public async Task<CreatedShipmentParcelModel> AddParcelAsync(
        AccountModel account,
        string shipmentId,
        ShipmentParcelModel parcel,
        ShipmentCodFiscalReceiptItemModel[] codFiscalReceiptItems,
        double declaredValueAmount,
        double? codAmount = null,
        CancellationToken ct = default)
    {
        var response = await endpoints.AddParcelShipmentAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            ShipmentId: shipmentId,
            Parcel: parcel.ToDto(),
            DeclaredValueAmount: declaredValueAmount,
            CodFiscalReceiptItems: [.. codFiscalReceiptItems.Select(i => i.ToDto())],
            CodAmount: codAmount
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
        return response.Parcel.ToModel();
    }

    public async Task<WrittenShipmentModel> FinalizePendingShipmentAsync(
        AccountModel account,
        string shipmentId,
        CancellationToken ct = default)
    {
        var response = await endpoints.FinalizePendingShipmentAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            ShipmentId: shipmentId
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
        return new(
            Id: response.Id,
            Parcels: [.. response.Parcels.Select(p => p.ToModel())],
            Price: response.Price.ToModel(),
            PickupDate: DateOnly.Parse(response.PickupDate),
            DeliveryDeadline: DateTime.Parse(response.DeliveryDeadline)
        );
    }

    public async Task<ShipmentModel[]> ShipmentInfoAsync(
        AccountModel account,
        string[] shipmentIds,
        CancellationToken ct = default)
    {
        var response = await endpoints.ShipmentInfoAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            ShipmentIds: shipmentIds
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
        return [.. response.Shipments.Select(d => d.ToModel())];
    }

    public async Task<SecondaryShipmentModel[]> SecondaryShipmentAsync(
        AccountModel account,
        string shipmentId,
        ShipmentType[] types,
        CancellationToken ct = default)
    {
        var response = await endpoints.SecondaryShipmentAsync(shipmentId, new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            Types: types
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
        return [.. response.Shipments.Select(d => d.ToModel())];
    }

    public async Task<WrittenShipmentModel> UpdateShipmentAsync(
        AccountModel account,
        string shipmentId,
        WriteShipmentModel model,
        CancellationToken ct = default)
    {
        var response = await endpoints.UpdateShipmentAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            Id: shipmentId,
            Recipient: model.Recipient.ToDto(),
            Service: model.Service.ToDto(),
            Content: model.Content.ToDto(),
            Payment: model.Payment.ToDto(),
            Sender: model.Sender?.ToDto(),
            ShipmentNote: model.ShipmentNote,
            Ref1: model.Ref1,
            Ref2: model.Ref2,
            ConsolidationRef: model.ConsolidationRef,
            RequireUnsuccessfulDeliveryStickerImage: model.RequireUnsuccessfulDeliveryStickerImage
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
        return new(
            Id: response.Id,
            Parcels: [.. response.Parcels.Select(p => p.ToModel())],
            Price: response.Price.ToModel(),
            PickupDate: DateOnly.Parse(response.PickupDate),
            DeliveryDeadline: DateTime.Parse(response.DeliveryDeadline)
        );
    }

    public async Task<WrittenShipmentModel> UpdateShipmentPropertiesAsync(
        AccountModel account,
        string shipmentId,
        Dictionary<string, string> properties,
        CancellationToken ct = default)
    {
        var response = await endpoints.UpdateShipmentPropertiesAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            Id: shipmentId,
            Properties: properties
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
        return new(
            Id: response.Id,
            Parcels: [.. response.Parcels.Select(p => p.ToModel())],
            Price: response.Price.ToModel(),
            PickupDate: DateOnly.Parse(response.PickupDate),
            DeliveryDeadline: DateTime.Parse(response.DeliveryDeadline)
        );
    }

    public async Task<string[]> FindParcelsByRefAsync(
        AccountModel account,
        string @ref,
        int searchInRef,
        bool? shipmentsOnly = null,
        bool? includeReturns = null,
        DateTime? fromDateTime = null,
        DateTime? toDateTime = null,
        CancellationToken ct = default)
    {
        var response = await endpoints.FindParcelsByRefAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            Ref: @ref,
            SearchInRef: searchInRef,
            ShipmentsOnly: shipmentsOnly,
            IncludeReturns: includeReturns,
            FromDateTime: fromDateTime?.ToString(DateTimeFormat),
            ToDateTime: toDateTime?.ToString(DateTimeFormat)
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
        return response.Barcodes;
    }

    public async Task HandoverToCourierAsync(
        AccountModel account,
        (DateTime DateTime, ShipmentParcelRefModel Parcel)[] parcels,
        CancellationToken ct = default)
    {
        var response = await endpoints.HandoverToCourierAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            Parcels: [.. parcels.Select(p => p.ToDto())]
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
    }

    public async Task HandoverToMidwayCarrierAsync(
        AccountModel account,
        (DateTime DateTime, ShipmentParcelRefModel Parcel)[] parcels,
        CancellationToken ct = default)
    {
        var response = await endpoints.HandoverToMidwayCarrierAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            Parcels: [.. parcels.Select(p => p.ToDto())]
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
    }

    public async Task<BarcodeInformationModel> BarcodeInformationAsync(
        AccountModel account,
        ShipmentParcelRefModel parcel,
        CancellationToken ct = default)
    {
        var response = await endpoints.BarcodeInformationAsync(new(
            UserName: account.Username,
            Password: account.Password,
            Language: account.Language,
            ClientSystemId: account.ClientSystemId,
            Parcel: parcel.ToDto()
        ), ct).ConfigureAwait(false);

        response.Error.EnsureNull();
        return new(
            LabelInfo: response.LabelInfo.ToModel(),
            PrimaryShipment: response.PrimaryShipment.ToModel(),
            PrimaryParcelId: response.PrimaryParcelId,
            ReturnShipmentId: response.ReturnShipmentId,
            ReturnParcelId: response.ReturnParcelId,
            RedirectShipmentId: response.RedirectShipmentId,
            RedirectParcelId: response.RedirectParcelId,
            InitialShipmentId: response.InitialShipmentId,
            InitialParcelId: response.InitialParcelId
        );
    }
}
